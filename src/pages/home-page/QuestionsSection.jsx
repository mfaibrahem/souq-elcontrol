import React from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import questionsImg from '../../assets/imgs/questions-img.png';
import './QuestionsSection.scss';
import CustomImage from '../../common/custom-image/CustomImage';

const { Panel } = Collapse;
const arr = [
  {
    id: 1,
    question: 'لماذا نستخدم سوق الكنترول',
    answer:
      'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى'
  },
  {
    id: 2,
    question: 'لماذا نستخدم سوق الكنترول',
    answer:
      'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى'
  },
  {
    id: 3,
    question: 'لماذا نستخدم سوق الكنترول',
    answer:
      'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى'
  },
  {
    id: 4,
    question: 'لماذا نستخدم سوق الكنترول',
    answer:
      'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى'
  }
];

const QuestionsSection = () => {
  const { t } = useTranslation();
  const renderArr = () => {
    return (
      <Collapse
        accordion
        ghost
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            style={{ fontSize: 18 }}
            rotate={isActive ? 90 : 0}
          />
        )}
      >
        {arr.map((ele, index) => {
          return (
            <Panel
              header={ele.question}
              key={index + 1}
              className="panel-wrapper"
            >
              <p>{ele.answer}</p>
            </Panel>
          );
        })}
      </Collapse>
    );
  };

  return (
    <section className="questions-section">
      <div className="custom-container">
        <p className="main-title">{t('questions_section.main_title')}</p>

        <div className="section-content">
          {renderArr()}
          <div className="section-img">
            <CustomImage src={questionsImg} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;
