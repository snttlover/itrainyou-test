import * as React from 'react';
import {DashedButton} from './DashedButton';

export default {
    component: DashedButton,
    title: 'Dashed Button'
};

export const normal = () => <DashedButton>Кнопка</DashedButton>;
export const disabled = () => <DashedButton disabled>Кнопка</DashedButton>;

