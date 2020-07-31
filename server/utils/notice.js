const yapi = require('../yapi.js');

function arrUnique(arr1, arr2) {
  let arr = arr1.concat(arr2);
  let res = arr.filter(function(item, index, arr) {
    return arr.indexOf(item) === index;
  });
  return res;
}

const noticeObj = {
  mail: {
    title: '邮件',
    handler: ({ emails }, title, content) => {
      yapi.commons.sendMail({
        to: emails,
        contents: content,
        subject: title
      });
    }
  },
  webhook: {
    title: 'webhook',
    handler: ({ webhooks }, title, content, metadata) => {
      // console.log('发送 webhooks:', webhooks, title, content);
      yapi.commons.sendWebhook({
        to: webhooks,
        subject: title,
        contents: content,
        metadata,
      });
    },
  },
}

yapi.emitHook('addNotice', noticeObj)

yapi.commons.sendNotice = async function(projectId, data, metadata) {
  const projectModel = require('../models/project.js');
  const webhookModel = require('../models/webhook.js');
  const userModel = require('../models/user.js');
  const followModel = require('../models/follow.js');

  const followInst = yapi.getInst(followModel);
  const userInst = yapi.getInst(userModel);
  const projectInst = yapi.getInst(projectModel);
  const webhookInst = yapi.getInst(webhookModel);

  const list = await followInst.listByProjectId(projectId);
  const starUsers = list.map(item => item.uid);

  const projectList = await projectInst.get(projectId);
  const projectMenbers = projectList.members
    .filter(item => item.email_notice)
    .map(item => item.uid);

  const users = arrUnique(projectMenbers, starUsers);
  const usersInfo = await userInst.findByUids(users);
  const emails = usersInfo.map(item => item.email).join(',');

  const webhooks = await webhookInst.getByProjectId(projectId);

  // console.log('project webhooks: ', projectId, webhooks);

  try {
    Object.keys(noticeObj).forEach(key=>{
      let noticeItem = noticeObj[key];
      // console.log('send mails: ', emails);
      try{
        noticeItem.handler({
          emails,
          webhooks,
        }, data.title, data.content, metadata);
      } catch(err) {
        yapi.commons.log('发送' + (noticeItem.title || key) + '失败' + err.message,  'error')
      }
    })
    // yapi.commons.sendMail({
    //   to: emails,
    //   contents: data.content,
    //   subject: data.title
    // });
  } catch (e) {
    yapi.commons.log('发送失败：' + e, 'error');
  }
};