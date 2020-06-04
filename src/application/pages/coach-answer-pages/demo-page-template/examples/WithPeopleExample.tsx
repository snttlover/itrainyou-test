import { CoachDemoPageTemplate } from "@/application/pages/coach-answer-pages/demo-page-template/CoachDemoPageTemplate"
import { PeopleOnTheClouds } from "@/application/pages/coach-answer-pages/demo-page-template/right-images/PeopleOnTheClouds"

const features = [`Смотреть список своих клиентов`, `Искать по своим клиентам`, `Переходить к диалогу с клиентом`]

export const WithPeopleExample = () => <CoachDemoPageTemplate features={features} rightImage={PeopleOnTheClouds} />
