import { combine, createEffect, createEvent, forward, guard, restore, sample, Store } from "effector-root"
import { SupportChatModelConfig } from "@/feature/support/create-support-chat.model"
import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { uploadMedia } from "@/lib/api/media"
import { runInScope } from "@/scope"
import { condition } from "patronum"
import FilePreview from "@/feature/chat/view/content/message-box/content/file-preview.svg"

type CreateChatMessageBoxModuleConfig = SupportChatModelConfig & {
  $chatId: Store<ChatId>
}

export type ChatFile = {
  id: number
  percent: number
  file: File
  serverUrl: string
  preview: string | null // src
}

type ChangeImage = { file: File } & Partial<ChatFile>

export const createChatMessageBoxModule = (config: CreateChatMessageBoxModuleConfig) => {
  const FileId = (i => () => i++)(0)

  const changeMessage = createEvent<string>()
  const $message = restore(changeMessage, "")

  const sendTextMessage = createEvent<string>()

  sample({
    source: config.$chatId.map(id => id as any),
    clock: sendTextMessage,
    fn: (chatId, message) => ({ chat: chatId, text: message }),
    target: config.socket.methods.send,
  })

  const addFile = createEvent<File>()
  const addDocument = createEvent<File>()

  const changeImages = createEvent<ChatFile[]>()
  const changeDocuments = createEvent<ChatFile[]>()

  const changeTenImages = createEvent()
  const changeTenDocuments = createEvent()

  const changeImage = createEvent<ChangeImage>()
  const changeDocument = createEvent<ChangeImage>()

  const deleteImage = createEvent<number>()
  const deleteDocument = createEvent<number>()

  const $images = restore(changeImages, [])
    .on(deleteImage, (images, id) => images.filter(image => image.id !== id))
    .on(changeTenImages, (images) => images.slice(0, 10))
    .on(addFile, (images, file) => [
      ...images,
      {
        file,
        preview: null,
        id: FileId(),
        percent: 0,
        serverUrl: "",
      },
    ])
    .on(changeImage, (images, payload) => {
      const image = images.find(image => image.file === payload.file)
      if (image) {
        Object.assign(image, payload)
      }

      return [...images]
    })

  const $documents = restore(changeDocuments, [])
    .on(deleteDocument, (documents, id) => documents.filter(image => image.id !== id))
    .on(changeTenDocuments, (documents) => documents.slice(0, 10))
    .on(addDocument, (documents, file) => [
      ...documents,
      {
        file,
        preview: FilePreview,
        id: FileId(),
        percent: 0,
        serverUrl: "",
      },
    ])
    .on(changeDocument, (documents, payload) => {
      const document = documents.find(document => document.file === payload.file)
      if (document) {
        Object.assign(document, payload)
      }

      return [...documents]
    })

    $documents.watch(resp => console.log("test", resp.length))
    $images.watch(resp => console.log("asdsad",resp.length))

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

  const uploadImages = createEvent()
  const uploadDocuments = createEvent()

  const uploadImagesFx = createEffect({
    handler: (images: ChatFile[]) => {
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
              serverUrl: res.file,
            })
          })
        )
      )
    },
  })

  const uploadDocumentsFx = createEffect({
    handler: (images: ChatFile[]) => {
      return Promise.all(
        images.map(image =>
          uploadMedia(
            {
              type: "OTHER",
              file: image.file,
            },
            (pe: ProgressEvent) => {
              runInScope(changeDocument, {
                file: image.file,
                percent: Math.round((pe.loaded * 100) / pe.total),
              })
            }
          ).then(res => {
            runInScope(changeDocument, {
              file: image.file,
              serverUrl: res.file,
            })
          })
        )
      )
    },
  })

  sample({
    source: $images,
    clock: uploadImages,
    target: uploadImagesFx,
  })

  sample({
    source: $documents,
    clock: uploadDocuments,
    target: uploadDocumentsFx,
  })

  const sendImagesToChatFx = createEffect({
    handler({ images, chat }: { images: ChatFile[]; chat: number }) {
      return new Promise((res) => {
        images
          .forEach(image => {
            if (image.serverUrl) {
              runInScope(config.socket.methods.send, {
                chat: chat,
                image: image.serverUrl,
              })
            }
          })
        res()
      })
    },
  })

  const sendDocumentsToChatFx = createEffect({
    handler({ documents, chat }: { documents: ChatFile[]; chat: number }) {
      return new Promise((res) => {
        documents
          .forEach(document => {
            if (document.serverUrl) {
              runInScope(config.socket.methods.send, {
                chat: chat,
                document: document.serverUrl,
              })
            }
          })
        res()
      })
    },
  })

  const sendImage = createEvent()
  const sendDocument = createEvent()

  const changeLimitImagesDialogVisibility = createEvent<boolean>()
  const changeLimitDocumentsDialogVisibility = createEvent<boolean>()

  const $limitImagesDialogVisibility = restore(changeLimitImagesDialogVisibility, false)
  const $limitDocumentsDialogVisibility = restore(changeLimitDocumentsDialogVisibility, false)

  condition({
    source: sendImage,
    if: $images.map(images => images.length < 11),
    then: uploadImages,
    else: changeLimitImagesDialogVisibility.prepend(() => true)
  })

  condition({
    source: sendDocument,
    if: $documents.map(documents => documents.length < 11),
    then: uploadDocuments,
    else: changeLimitDocumentsDialogVisibility.prepend(() => true)
  })

  const sendTenImages = createEvent()
  const sendTenDocuments = createEvent()

  forward({
    from: sendTenImages,
    to: [changeLimitImagesDialogVisibility.prepend(() => false),changeTenImages],
  })

  /*forward({
    from: sendTenImages,
    to: changeTenImages
  })*/

  forward({
    from: sendTenDocuments,
    to: [changeLimitDocumentsDialogVisibility.prepend(() => false),changeTenDocuments],
  })

  /*forward({
    from: sendTenDocuments,
    to: changeTenDocuments,
  })*/

  forward({
    from: changeTenImages,
    to: uploadImages
  })

  forward({
    from: changeTenDocuments,
    to: uploadDocuments
  })

  sample({
    // @ts-ignore
    source: combine($images, config.$chatId, (images, chat) => ({ images, chat })),
    clock: uploadImagesFx.doneData,
    // @ts-ignore
    target: sendImagesToChatFx,
  })

  sample({
    // @ts-ignore
    source: combine($documents, config.$chatId, (documents, chat) => ({ documents, chat })),
    clock: uploadDocumentsFx.doneData,
    // @ts-ignore
    target: sendDocumentsToChatFx,
  })

  forward({
    from: sendImagesToChatFx.doneData,
    to: changeImages.prepend(() => [])
  })

  forward({
    from: sendDocumentsToChatFx.doneData,
    to: changeDocuments.prepend(() => [])
  })

  return {
    data: {
      $message,
      $images,
      $documents,
      $limitDialogVisibility: {$limitImagesDialogVisibility,$limitDocumentsDialogVisibility},
    },
    methods: {
      changeMessage,
      sendTextMessage,
      add: {addFile,addDocument},
      delete: {deleteImage, deleteDocument},
      send: {sendImage, sendDocument},
      changeLimitDialogVisibility: {changeLimitImagesDialogVisibility, changeLimitDocumentsDialogVisibility},
      sendTen: {sendTenImages, sendTenDocuments},
    },
  }
}
