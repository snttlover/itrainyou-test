import feat1Img from "../../assets/features/desktop/1.png"
import feat2Img from "../../assets/features/desktop/2.png"
import feat3Img from "../../assets/features/desktop/3.png"

import feat1MobileImg from "../../assets/features/mobile/1.png"
import feat2MobileImg from "../../assets/features/mobile/2.png"
import feat3MobileImg from "../../assets/features/mobile/3.png"

export const content = [
    {
      id: 1,
      title: "Заполняйте профиль и расписание",
      descr:
        "В ЛК вы сможете рассказать клиентам всю информацию о  вашем опыте, добавить фото ваших дипломов и сертификатов и настроить расписание. Клиент сможет выбрать только то время, которое окажется свободным у вас",
      image: feat1Img,
      imageMobile: feat1MobileImg,
      desktopTopOffset: 40
    },
    {
      id: 2,
      title: "Получайте запросы от клиентов",
      descr:
        "Все запросы на бронирование сессии будут приходить в единый системный диалог, где вы быстро сможете их подтведить или отклонить. Также при подтверждении сессия будет автоматически внесена в ваше расписание.",
      image: feat2Img,
      imageMobile: feat2MobileImg,
      desktopTopOffset: 60
    },
    {
      id: 3,
      title: "Обменивайтесь результатами сессий в удобном чате",
      descr:
        "Вы сможете провести онлайн-сессию на платформе, открыть чат с клиентом во время видео-звонка, чтобы отправить комментарии или задания. Также в чат можно загрузить файлы любого формата.",
      image: feat3Img,
      imageMobile: feat3MobileImg,
      desktopTopOffset: 84
    },
  ]