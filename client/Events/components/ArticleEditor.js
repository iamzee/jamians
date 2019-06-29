import React from 'react';
import {convertFromRaw, EditorState, RichUtils} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js/dist/Draft.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import {CompositeDecorator} from 'draft-js';

import IconButton from '@material-ui/core/IconButton';
import BoldIcon from '@material-ui/icons/FormatBoldOutlined';
import ItalicIcon from '@material-ui/icons/FormatItalicOutlined';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  editor: {
    fontFamily: 'Roboto',
  },
});

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

class ArticleEditor extends React.Component {
  state = {
    editorState: !!this.props.editorState
      ? this.props.editorState
      : EditorState.createEmpty(),
  };

  componentDidMount() {
    if (this.props.rawContent) {
      const text = convertFromRaw(JSON.parse(this.props.rawContent));
      const content = EditorState.createWithContent(text, decorator);
      console.log('EDITOR CONTENT', content);
      this.setState(() => ({editorState: content}));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rawContent !== this.props.rawContent) {
      const text = convertFromRaw(JSON.parse(this.props.rawContent));
      const content = EditorState.createWithContent(text, decorator);
      console.log('EDITOR CONTENT', content);
      this.setState(() => ({editorState: content}));
    }
  }

  onChange = editorState => {
    this.setState(() => ({editorState}));
    this.props.onChange(editorState);
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  _onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  };

  _onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')
    );
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.editor}>
        {!this.props.readOnly && (
          <div>
            <IconButton onClick={this._onBoldClick}>
              <BoldIcon />
            </IconButton>
            <IconButton onClick={this._onItalicClick}>
              <ItalicIcon />
            </IconButton>
          </div>
        )}
        <Editor
          placeholder="Enter event details..."
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          editorState={this.state.editorState}
          plugins={plugins}
          readOnly={this.props.readOnly}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ArticleEditor);
