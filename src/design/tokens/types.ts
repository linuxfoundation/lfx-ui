// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

type BaseToken<T> = {
  value: T;
  type: string;
};

type SimpleToken = BaseToken<{
  value: string;
  type: 'other';
}>;

type BoxShadowToken = BaseToken<{
  x: { value: string; type: 'other' };
  y: { value: string; type: 'other' };
  blur: { value: string; type: 'other' };
  spread: { value: string; type: 'other' };
  color: { value: string; type: 'other' };
  type: { value: 'dropShadow'; type: 'other' };
}>;

export interface StrokeToken {
  value: {
    color: { value: string; type: 'other' };
    width: { value: string; type: 'other' };
    style: { value: string; type: 'other' };
  };
  type: string;
}

export type Token = BoxShadowToken | SimpleToken | StrokeToken;
