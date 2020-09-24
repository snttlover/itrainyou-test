import { combine, createEffect, createEvent, forward, restore, sample, Store } from "effector-root"
import { SupportChatModelConfig } from "@/feature/support/create-support-chat.model"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { uploadMedia } from "@/lib/api/media"
import { runInScope } from "@/scope"

type CreateChatMessageBoxModuleConfig = SupportChatModelConfig & {
  $chatId: Store<ChatId>
}

export type ChatImage = {
  id: number
  percent: number
  file: File
  serverId: null | number
  preview: string | null // src
}

type ChangeImage = { file: File } & Partial<ChatImage>

export const createChatMessageBoxModule = (config: CreateChatMessageBoxModuleConfig) => {
  const FileId = (i => () => i++)(0)

  const changeMessage = createEvent<string>()
  const $message = restore(changeMessage, ``)

  const sendTextMessage = createEvent<string>()

  sample({
    source: config.$chatId.map(id => id as any),
    clock: sendTextMessage,
    fn: (chatId, message) => ({ chat: chatId, text: message }),
    target: config.socket.methods.send,
  })

  const addFile = createEvent<File>()
  const changeImages = createEvent<ChatImage[]>()
  const changeImage = createEvent<ChangeImage>()
  const deleteImage = createEvent<number>()
  const $images = restore(changeImages, [])
    .on(deleteImage, (images, id) => images.filter(image => image.id !== id))
    .on(addFile, (images, file) => [
      ...images,
      {
        file,
        preview: null,
        id: FileId(),
        percent: 0,
        serverId: null,
      },
    ])
    .on(changeImage, (images, payload) => {
      const image = images.find(image => image.file === payload.file)
      if (image) {
        Object.assign(image, payload)
      }

      return [...images]
    })

  const readImageFx = createEffect({
    handler: (file: File) => {
      return new Promise<ChangeImage>(res => {
        const reader = new FileReader()
        reader.addEventListener("load", () => {
          res({
            preview: reader.result as string,
            file,
          })
        })
        reader.readAsDataURL(file)
      })
    },
  })

  forward({
    from: addFile,
    to: readImageFx,
  })

  forward({
    from: readImageFx.doneData,
    to: changeImage,
  })

  const upload = createEvent()

  const uploadImagesFx = createEffect({
    handler: (images: ChatImage[]) => {
      return Promise.all(
        images.map(image =>
          uploadMedia(
            {
              type: "IMAGE",
              file: image.file,
            },
            (pe: ProgressEvent) => {
              runInScope(changeImage, {
                file: image.file,
                percent: Math.round((pe.loaded * 100) / pe.total),
              })
            }
          ).then(res => {
            runInScope(changeImage, {
              file: image.file,
              serverId: res.id,
            })
          })
        )
      )
    },
  })

  uploadImagesFx.doneData.watch((data) => {
    debugger
  })

  sample({
    source: $images,
    clock: upload,
    target: uploadImagesFx,
  })

  const sendImagesToChatFx = createEffect({
    handler({ images, chat }: { images: ChatImage[]; chat: number }) {
      debugger
      images
        .forEach(image => {
          if (image.serverId !== null) {
            runInScope(config.socket.methods.send, {
              chat: chat,
              image: image.serverId,
            })
          }
        })
    },
  })

  sample({
    // @ts-ignore
    source: combine($images, config.$chatId, (images, chat) => ({ images, chat })),
    clock: uploadImagesFx.doneData,
    // @ts-ignore
    target: [sendImagesToChatFx],
  })

  return {
    data: {
      $message,
      $images,
    },
    methods: {
      changeMessage,
      sendTextMessage,
      addFile,
      deleteImage,
      upload,
    },
  }
}
