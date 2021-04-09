import { ChatId } from "@/lib/api/chats/coach/get-messages"
import { Pagination } from "@/lib/api/interfaces/utils.interface"
import { createEvent, createStore, forward, restore, sample, Store } from "effector-root"
import { ChatMaterials } from "@/lib/api/chats/clients/get-images"
import { createPagination } from "@/feature/pagination"
import { PaginationRequest } from "@/feature/pagination/modules/pagination"

type createChatMaterialsModuleConfig = {
  $chatId: Store<ChatId>
  fetchMaterials: (id: ChatId, materials: "images" | "documents", params: PaginationRequest) => Promise<Pagination<ChatMaterials>>
}

type ChatMaterialsTabs = "images" | "documents"

export const createChatMaterialsModule = (config: createChatMaterialsModuleConfig) => {
  const reset = createEvent()

  const changeTab = createEvent<ChatMaterialsTabs>()
  const $tab = createStore<ChatMaterialsTabs>("images")
    .on(changeTab, (_, tab) => tab)

  let chatId: ChatId = 0
  let tab: "images" | "documents" = "images"
  config.$chatId.watch(payload => (chatId = payload))
  $tab.watch(payload => (tab = payload))

  const pagination = createPagination<ChatMaterials>({
    fetchMethod: params => config.fetchMaterials(chatId, tab, params),
  })

  const changeDialogVisibility = createEvent<boolean>()
  const $dialogVisibility = restore(changeDialogVisibility, false).reset()

  const $materials = pagination.data.$list.map(materials => materials.map(material => material))

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

  forward({
    from: changeTab,
    to: [reset, load],
  })

  const openImage = createEvent<string>()
  const openImageByIndex = createEvent<number>()
  const $images = $materials.map<string[]>(materials =>
    materials
      .map(material => material.file)
  )

  const changeImageModalVisibility = createEvent<boolean>()
  const $imagesModal = restore(changeImageModalVisibility, false).reset(reset)
  const changeInitialSlide = createEvent<number>()
  const $initialSlide = restore(changeInitialSlide, 0)

  sample({
    source: $images,
    clock: openImage,
    fn: (images, image) => images.indexOf(image),
    target: changeInitialSlide
  })

  forward({
    from: openImageByIndex,
    to: changeInitialSlide
  })

  forward({
    from: changeInitialSlide,
    to: changeImageModalVisibility.prepend(() => true)
  })

  return {
    data: {
      $dialogVisibility,
      $materials,
      $tab,
      $isEmpty: pagination.data.$listIsEmpty,
    },
    methods: {
      changeDialogVisibility,
      reset,
      load,
      openDialog,
      changeTab,
    },
    modules: {
      pagination,
      imagesDialog: {
        $itemsCount: pagination.data.$itemsCount,
        openImageByIndex,
        $images,
        $visibility: $imagesModal,
        changeVisibility: changeImageModalVisibility,
        openImage,
        $initialSlide
      }
    },
  }
}
