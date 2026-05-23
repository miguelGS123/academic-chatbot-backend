import { Redirect, type Href } from 'expo-router';
import React from 'react';

const loginRoute = '/(auth)/login' as Href;

export default function IndexScreen(): React.JSX.Element {
  return <Redirect href={loginRoute} />;
}