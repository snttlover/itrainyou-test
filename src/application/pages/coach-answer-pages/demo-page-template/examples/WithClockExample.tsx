import { CoachDemoPageTemplate } from "@/application/pages/coach-answer-pages/demo-page-template/CoachDemoPageTemplate"
import {GirlWithClock} from "@/application/pages/coach-answer-pages/demo-page-template/right-images/GirlWithClock"

const features = [`Смотреть список своих клиентов`, `Искать по своим клиентам`]

export const WithClockExample = () => <CoachDemoPageTemplate features={features} rightImage={GirlWithClock} />
