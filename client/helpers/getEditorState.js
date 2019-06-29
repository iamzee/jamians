import React from 'react';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import {CompositeDecorator} from 'draft-js';
import {convertFromRaw, EditorState} from 'draft-js';

export default function(rawContent) {
  const linkifyPlugin = createLinkifyPlugin({
    component: props => <a {...props} target={'_blank'} />,
  });

  const plugins = [linkifyPlugin];

  function getPluginDecoratorArray() {
    let decorators = [];
    let plugin;

    for (plugin of plugins) {
      if (plugin.decorators !== null && plugin.decorators !== undefined) {
        decorators = decorators.concat(plugin.decorators);
      }
    }
    return decorators;
  }

  function grabbingAllPluginDecorators() {
    return new MultiDecorator([
      new CompositeDecorator(getPluginDecoratorArray()),
    ]);
  }

  const decorator = grabbingAllPluginDecorators();

  const text = convertFromRaw(JSON.parse(rawContent));
  const content = EditorState.createWithContent(text, decorator);
  return content;
}
