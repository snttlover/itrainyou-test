import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { Pagination } from "@/lib/api/interfaces/utils.interface"
import { createEvent, forward, Store } from "effector-root"
import { ChatMaterials } from "@/lib/api/chats/clients/get-images"
import { createPagination } from "@/feature/pagination"
import { PaginationRequest } from "@/feature/pagination/modules/pagination"

type createChatMaterialsModuleConfig = {
  $chatId: Store<ChatId>
  fetchMaterials: (
    id: ChatId,
    materials: "images" | "documents",
    params: PaginationRequest
  ) => Promise<Pagination<ChatMaterials>>
}

export const createChatDocumentsListModule = (config: createChatMaterialsModuleConfig) => {
  const reset = createEvent()

  let chatId: ChatId = 0
  config.$chatId.watch(payload => (chatId = payload))

  const pagination = createPagination<ChatMaterials>({
    fetchMethod: params => config.fetchMaterials(chatId, "images", params),
    pageSize: 20,
  })

  const $materials = pagination.data.$list.map(materials => materials.map(material => material))

  const load = createEvent()

  forward({
    from: reset,
    to: pagination.methods.reset,
  })

  forward({
    from: load,
    to: pagination.methods.loadMore,
  })

  const init = createEvent()

  forward({
    from: init,
    to: [reset, load],
  })

  return {
    data: {
      $materials,
      $isEmpty: pagination.data.$listIsEmpty,
    },
    methods: {
      reset,
      load,
      init,
    },
    modules: {
      pagination,
    },
  }
}
