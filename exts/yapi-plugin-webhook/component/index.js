/* eslint-disable */
import React, { useState, useCallback, useEffect } from 'react';
import Highlight from 'react-highlight';

import Create from './components/create';
import Update from './components/update';

import './index.less';

import {
  Table,
  Button,
  Modal,
  message
} from 'antd';

import axios from 'axios';

// const DATASOURCE = [
//   {
//     key: '1',
//     name: '胡彦斌',
//     url: 'http://127.0.0.1:8080/project/33/setting?tab=Webhook',
//     method: 'POST',
//     contentType: 'application/json',
//     template: JSON.stringify({ "title": "{{title}}", "content": "{{content}}" }, null, 2)
//   }
// ];

const api = {
  async list(projectId) {
    const response = await axios.get(`/api/plugin/webhook/list?projectId=${projectId}`);
    const { total, data } = response.data.data;

    return {
      total,
      data,
    };
  },
  async create(projectId, doc) {
    await axios.post(`/api/plugin/webhook/create?projectId=${projectId}`, {
      ...doc,
      projectId,
    });
  },
  async update(projectId, uid, doc) {
    await axios.post(`/api/plugin/webhook/update?projectId=${projectId}&uid=${uid}`, {
      ...doc,
      projectId,
      uid,
    });
  },
  async delete(projectId, uid) {
    await axios.post(`/api/plugin/webhook/delete?projectId=${projectId}&uid=${uid}`);
  },
};

export default function Webhook({ projectId }) {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(1);
  const [visible, setVisible] = useState({});
  const [dataSource, setDataSource] = useState({
    table: [],
    update: null
  });

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: 'Webhook'
    },
    {
      dataIndex: 'url',
      key: 'url',
      title: 'URL'
    },
    {
      dataIndex: 'actions',
      key: 'actions',
      title: '操作',
      render: (text, record) => {
        return (
          <div className="actions">
            <a className="action"  onClick={createOpen('update', record)}>编辑</a>
            <a className="action"  onClick={() => onCopy(record)}>复制</a>
            <a className="action"  onClick={() => onConfirmDelete(record)}>删除</a>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    setLoading(true);

    api.list(projectId)
      .then(({ total, data }) => {
        setDataSource({
          ...dataSource,
          table: data,
        });

        setTotal(total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId]);

  const createOpen = useCallback((key, value) => {
    return () => {
      setDataSource({
        ...dataSource,
        [key]: value
      });

      setVisible({
        ...visible,
        [key]: true
      });
    };
  }, [visible, dataSource]);

  const createCancel = useCallback((key) => {
    return () => {
      setVisible({
        ...visible,
        [key]: false
      });
    };
  }, [visible]);

  const onCopy = useCallback((record) => {
    api.create(projectId, { ...record, name: `${record.name}_copy` })
      .then(() => {
        setLoading(true);

        api.list(projectId)
          .then(({ total, data }) => {
            setDataSource({
              ...dataSource,
              table: data,
            });

            setTotal(total);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        message.error('删除 Webhook 失败');
      });
  }, [dataSource, visible]);

  const onDelete = useCallback((record) => {
    api.delete(projectId, record.uid)
      .then(() => {
        setLoading(true);

        api.list(projectId)
          .then(({ total, data }) => {
            setDataSource({
              ...dataSource,
              table: data,
            });

            setTotal(total);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        message.error('删除 Webhook 失败');
      });
  }, [dataSource, visible]);

  const onConfirmDelete = useCallback((record) => {
    Modal.confirm({
      cancelText: '取消',
      content: `确认删除 ${record.name}`,
      okButtonProps: {
        type: 'danger'
      },
      onOk: () => {
        return onDelete(record);
      }
    });
  }, [dataSource, visible]);

  const onSubmitCreate = useCallback((data, cb) => {
    api.create(projectId, data)
      .then(() => {
        cb();

        setLoading(true);

        api.list(projectId)
          .then(({ total, data }) => {
            setDataSource({
              ...dataSource,
              table: data,
            });

            setTotal(total);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        message.error('创建 Webhook 失败');
      });
  }, [dataSource, projectId]);

  const onSubmitUpdate = useCallback((uid, data, cb) => {
    api.update(projectId, uid, data)
      .then(() => {
        cb();

        setLoading(true);

        api.list(projectId)
          .then(({ total, data }) => {
            setDataSource({
              ...dataSource,
              table: data,
            });

            setTotal(total);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        message.error('更新 Webhook 失败');
      });
  }, [dataSource, projectId]);

  const renderHeader = useCallback(() => {
    return (
      <div className="header">
        <div className="left">
          <span>Webhooks</span>
        </div>
        <div className="right">
          <Button type="primary" onClick={createOpen('create')}>新增</Button>
        </div>
      </div>
    );
  }, [dataSource, visible]);
  

  const renderExpandedRow = useCallback((record, index) => {
    return (
      <div className="expand-row" key={index}>
        <table>
          <tbody>
            <tr>
              <td>Method: <span style={{ color: '#108ee9' }}>{record.method}</span></td>
            </tr>
            <tr>
              <td>URL: {record.url}</td>
            </tr>
            <tr>
              <td>Content-Type: <span style={{ color: '#108ee9' }}>{record.contentType}</span></td>
            </tr>
            <tr>
              <td>
                <Highlight>{record.template}</Highlight>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }, [dataSource])

  return (
    <div
      className="plugin-webhook"
    >
      <Table
        loading={loading}
        rowKey="uid"
        title={renderHeader}
        pagination={false}
        showHeader={false}
        columns={columns}
        dataSource={dataSource.table}
        expandedRowRender={renderExpandedRow}
      />
      <Create
        visible={visible.create}
        onSubmit={onSubmitCreate}
        onCancel={createCancel('create')}
      />
      <Update
        visible={visible.update}
        dataSource={dataSource.update}
        onSubmit={onSubmitUpdate}
        onCancel={createCancel('update')}
      />
    </div>
  )
}