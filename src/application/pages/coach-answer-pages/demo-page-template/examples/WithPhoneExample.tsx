import { CoachDemoPageTemplate } from "@/application/pages/coach-answer-pages/demo-page-template/CoachDemoPageTemplate"
import { PhoneWithGirl } from "@/application/pages/coach-answer-pages/demo-page-template/right-images/PhoneWithGirl"

const features = [`Смотреть список своих клиентов`, `Искать по своим клиентам`, `Переходить к диалогу с клиентом`]

export const WithPhoneExample = () => <CoachDemoPageTemplate features={features} rightImage={PhoneWithGirl} />
