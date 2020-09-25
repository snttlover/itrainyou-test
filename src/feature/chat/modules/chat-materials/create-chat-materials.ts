import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { CursorPagination, CursorPaginationRequest } from "@/lib/api/interfaces/utils.interface"
import { createEvent, forward, restore, Store } from "effector-root"
import { createCursorPagination } from "@/feature/pagination/modules/cursor-pagination"
import { ChatImage } from "@/lib/api/chats/clients/get-images"

type createChatMaterialsModuleConfig = {
  $chatId: Store<ChatId>
  fetchMaterials: (id: ChatId, params: CursorPaginationRequest) => Promise<CursorPagination<ChatImage>>
}

export const createChatMaterialsModule = (config: createChatMaterialsModuleConfig) => {
  const reset = createEvent()

  let chatId: ChatId = 0
  config.$chatId.watch(payload => (chatId = payload))

  const pagination = createCursorPagination<ChatImage>({
    fetchMethod: params => config.fetchMaterials(chatId, params),
  })

  const changeDialogVisibility = createEvent<boolean>()
  const $dialogVisibility = restore(changeDialogVisibility, false).reset()

  const $materials = pagination.data.$list.map(images => images.map(image => image))

  const load = createEvent()
  const openDialog = createEvent()

  forward({
    from: openDialog,
    to: reset,
  })

  forward({
    from: reset,
    to: pagination.methods.reset,
  })

  forward({
    from: openDialog.map(() => true),
    to: changeDialogVisibility,
  })

  forward({
    from: openDialog,
    to: load,
  })

  forward({
    from: load,
    to: pagination.methods.loadMore,
  })

  return {
    data: {
      $dialogVisibility,
      $materials,
      $isEmpty: pagination.data.$listIsEmpty
    },
    methods: {
      changeDialogVisibility,
      reset,
      load,
      openDialog,
    },
    modules: {
      pagination,
    },
  }
}
