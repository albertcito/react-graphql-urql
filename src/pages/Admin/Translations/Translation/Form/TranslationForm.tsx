import { FormattedMessage } from 'react-intl';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import React, { useCallback } from 'react';
import { CombinedError } from 'urql';

import { LangEnum } from 'use/global/useIntl';
import NoDataUrql from 'ui/NoDataUrql';
import { TranslationCreateProperties } from './TranslationFormInterfaces';

interface LangProperties {
  id: string;
}

interface VText {
  text: string;
  langID: string;
  originalLangID: string;
}
interface Translation {
  code: string;
  isBlocked: boolean;
  texts: VText[]
}

type FormArguments = {
  code: string;
  isBlocked: boolean;
} & {
  [key: string]: string
};

interface TranslationFormProperties {
  translation?: Translation;
  onFinish: (values: TranslationCreateProperties) => void;
  fetching: boolean;
  error?: CombinedError;
  langs: LangProperties[];
}

const onFinishInternal = (values: FormArguments) => {
  const { code, isBlocked, ...langs } = values;
  const createValues: TranslationCreateProperties = { code, isBlocked, texts: [] };
  Object.keys(langs).forEach((langID) => {
    createValues.texts.push({
      langID,
      text: langs[langID],
    });
  });
  return createValues;
};

export const getTexts = (texts: VText[]) => {
  const translations: { [key: string]: string } = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const text of texts) {
    const originalText = (text.originalLangID === text.langID) ? text.text : '';
    const langID = text.langID as LangEnum;
    translations[langID] = originalText;
  }
  return translations;
};

const TranslationForm: React.FC<TranslationFormProperties> = ({
  translation,
  fetching,
  error,
  onFinish,
  langs,
}) => {
  const langsTexts = translation ? getTexts(translation.texts) : {};
  const initialValues = { ...translation, ...langsTexts };
  const [form] = Form.useForm();
  const submitEnter = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      form.submit();
    }
  }, [form]);

  return (
    <Spin spinning={fetching}>
      {(fetching || error) && <NoDataUrql fetching={fetching} error={error} />}
      <Form
        layout='vertical'
        onFinish={(values) => onFinish(onFinishInternal(values))}
        initialValues={initialValues}
        form={form}
      >
        <Form.Item
          name='isBlocked'
          valuePropName='checked'
        >
          <Checkbox>
            <FormattedMessage id='generic.blocked' />
          </Checkbox>
        </Form.Item>
        {
          langs.map((lang) => {
            let required = {};
            if (lang.id === 'EN') {
              required = {
                required: true,
                message: `This ${lang.id} translations is required`,
              };
            }
            return (
              <Form.Item
                className='form-item'
                name={lang.id}
                label={lang.id}
                key={lang.id}
                rules={[required]}
              >
                <Input.TextArea
                  rows={1}
                  autoSize
                  onKeyDown={submitEnter}
                />
              </Form.Item>
            );
          })
        }
        <Form.Item
          className='form-item'
          name='code'
          label='Code'
        >
          <Input disabled={translation?.isBlocked} />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='session-form-button'
            disabled={fetching}
          >
            <FormattedMessage id='generic.submit' />
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default TranslationForm;
