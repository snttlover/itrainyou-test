import * as React from 'react';
import {ExpansionPanel} from './ExpansionPanel';
import {CSSProperties} from "react";

export default {
    component: ExpansionPanel,
    title: 'Expansion Panel'
};

const title = `Что будет, если коуч не поможет мне достичь результатов?`

const wrapperStyles: CSSProperties = {
    width: `400px`
}

export const normal = () => (
    <div style={wrapperStyles}>
      <ExpansionPanel title={title}>
        <p>Коучи вдохновляют на изменения, помогают разобраться в себе, поставить цели. </p>
        <p>Решить проблему за час невозможно, но найти нужное направление реально. Результаты обязательно будут, ведь их достигаете лично вы.</p>
      </ExpansionPanel>
    </div>
)

