import CustomCodeTool from '@/components/editor/customBlocks/CodeBlock';
import { API_URL } from '@/constants/api';
import axiosInstance from '@/services/api/axiosInstance';
import Delimiter from '@editorjs/delimiter';
import { EditorConfig } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';

export const getEditorConfig = (blogId: string): EditorConfig => ({
  holder: 'editorjs_editor-container',
  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        levels: [1, 2, 3],
        defaultLevel: 2,
      },
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
      config: {
        placeholder: '',
      },
    },
    list: {
      class: List,
      inlineToolbar: true,
      config: {
        defaultStyle: 'unordered',
      },
    },
    code: {
      class: CustomCodeTool,
      // config: {
      //   placeholder: 'Add your code snippet...',
      // },
    },
    delimiter: Delimiter,
    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: '',
      },
    },
    image: {
      class: Image,
      config: {
        captionPlaceholder: '',
        uploader: {
          async uploadByFile(file: File) {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axiosInstance.post(
              `/files/post/${blogId}`,
              formData
            );

            return {
              success: 1,
              file: {
                url: `${API_URL}/files/post/${blogId}/${response.data.new_file_name}`,
              },
            };
          },
        },
      },
    },
    table: {
      class: Table,
      inlineToolbar: true,
      config: {
        rows: 3,
        cols: 2,
      },
    },
  },
  defaultBlock: 'paragraph',
});
