import React from 'react';
import {Editor, convertFromRaw, EditorState} from 'draft-js';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js/dist/Draft.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import {CompositeDecorator} from 'draft-js';

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
  console.log(decorators);
  return decorators;
}

function grabbingAllPluginDecorators() {
  return new MultiDecorator([
    new CompositeDecorator(getPluginDecoratorArray()),
  ]);
}

const decorator = grabbingAllPluginDecorators();

class MyEditor extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  componentDidMount() {
    const text = convertFromRaw(JSON.parse(this.props.rawContent));
    const content = EditorState.createWithContent(text, decorator);
    this.setState(() => ({editorState: content}));
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        plugins={plugins}
        readOnly={true}
      />
    );
  }
}

export default MyEditor;
