import request from '~/net/request'

export default function (context, next) {
    Promise.all([
        request.getSiteConfig({client: context.req}),
        request.getUserInfo({client: context.req}),
        request.getMessages({client: context.req}),
        request.getTop10({client: context.req}),
        request.getMaxComment({client: context.req}),
        request.getMaxBrowse({client: context.req})
    ]).then((arr) => {
        let siteConfig = arr[0].data
        context.user = arr[1].data.user || null
        let messages = arr[2].data.messages || []
        let messageCount = arr[2].data.messageCount || 0
        let top10Users = arr[3].data.users || []
        let maxCommentArticles = arr[4].data.articles || []
        let maxBrowseArticles = arr[5].data.articles || []
        context.store.commit('siteConfig', siteConfig)
        context.store.commit('messages', messages)
        context.store.commit('messageCount', messageCount)
        context.store.commit('user', context.user)
        context.store.commit('top10Users', top10Users)
        context.store.commit('maxCommentArticles', maxCommentArticles)
        context.store.commit('maxBrowseArticles', maxBrowseArticles)
        next()
    }).catch((err) => {
        console.log(err)
        context.error({ statusCode: 404, message: 'Page not found' })
    })
}
