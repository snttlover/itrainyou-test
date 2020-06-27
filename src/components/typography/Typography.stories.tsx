import * as React from 'react';
import {Text} from "./Text"

export default {
    component: Text,
    title: 'Typography'
};

export const example = () => (
  <>
    <Text small>Small</Text>
    <Text medium>Medium</Text>
    <Text large>Large</Text>
  </>
)

