import React, { useEffect } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';
import './CustomEditor.scss';
import htmlToDraft from 'html-to-draftjs';
import { ContentState, EditorState } from 'draft-js';

const CustomEditor = ({
  fieldName,
  editorTitle,
  setValue,
  watch,
  setError,
  clearErrors,
  errors,
  required,
  errorMsg,
  editorFieldState,
  setEditorFieldState,
  fetchedData
}) => {
  useEffect(() => {
    if (
      fetchedData &&
      !editorFieldState.getCurrentContent().getPlainText().trim()
    ) {
      const contentBlock = htmlToDraft(fetchedData);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorFieldState(editorState);
      }
    }
    // else {
    //   setValue(fieldName, stateToHTML(editorFieldState.getCurrentContent()));
    // }
  }, [fetchedData]);

  // }, [stateToHTML(editorFieldState.getCurrentContent()), fetchedData]);
  // useEffect(() => {
  //   setValue(fieldName, stateToHTML(editorFieldState.getCurrentContent()));
  // }, [stateToHTML(editorFieldState.getCurrentContent())]);
  // console.log('has text : ', editorFieldState.getCurrentContent().hasText());

  useEffect(() => {
    setValue(fieldName, stateToHTML(editorFieldState.getCurrentContent()));
  }, [stateToHTML(editorFieldState.getCurrentContent())]);

  return (
    <div className="editor-wrapper">
      <p className="editor-title">
        <EditOutlined />
        {editorTitle}
      </p>
      <Editor
        toolbar={{
          options: [
            // 'inline',
            // 'fontSize',
            // 'fontFamily',
            'list',
            'emoji',
            'blockType'
            // 'image',
          ],
          list: {
            className: 'custom-list'
          },
          blockType: {
            className: 'custom-block-type',
            options: [
              'Normal',
              'H1',
              'H2',
              'H3',
              'H4',
              'H5',
              'H6',
              'Blockquote'
            ]
          }
        }}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorState={editorFieldState}
        onEditorStateChange={(v) => {
          setEditorFieldState(v);
          if (
            (!watch(fieldName) ||
              !editorFieldState.getCurrentContent().getPlainText().trim()) &&
            required
          ) {
            setError(fieldName, {
              type: 'required',
              message: { errorMsg }
            });
          } else {
            // setError('fieldName', )
            clearErrors(fieldName);
          }
        }}
      />
      <p className="error-p">
        {errors?.fieldName ? errors?.fieldName.message : ''}
      </p>
    </div>
  );
};

export default CustomEditor;
