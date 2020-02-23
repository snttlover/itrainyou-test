import * as React from 'react';
import {Button} from './Button';

export default {
    component: Button,
    title: 'Button'
};

export const normal = () => <Button>Кнопка</Button>;
export const disabled = () => <Button disabled>Кнопка</Button>;

