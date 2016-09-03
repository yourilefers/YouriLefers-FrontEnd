/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ItemComponent } from './item.component';

describe('Component: Item', () => {
  it('should create an instance', () => {
    let component = new ItemComponent();
    expect(component).toBeTruthy();
  });
});
