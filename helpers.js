import React from 'react'
import { Icon } from 'semantic-ui-react'
import ThreadInfo from './client/components/forum/threadInfo'

export const removeSpaces = (phrase) => {
    return phrase.replace(/\s/g, '');
}

export const addSpaces = (phrase) => {
    let phraseArr = []
    let lastUpperIndex = 0
    for (let i = 0; i < phrase.length; i++) {
        if (phrase[i] === phrase[i].toUpperCase() && i !== lastUpperIndex){
          phraseArr.push(phrase.slice(lastUpperIndex, i))
          lastUpperIndex = i
        }
    }
    phraseArr.push(phrase.slice(lastUpperIndex))
    return phraseArr.join(' ')
}

export const subforumIcon = (elementTitle) => {
    if (elementTitle === 'Game Design') {
        return <Icon color='red' name='gamepad' />
    } else if (elementTitle === 'Art') {
        return <Icon color='green' name='paint brush' />
    } else if (elementTitle === 'General') {
        return <Icon color='purple' name='comment outline' />
    }
}

export const readableDate = (date) => {
    let dateString = ''
    let dateMilliseconds = parseInt(date, 10) / 1000
    var timeStamp = Math.round(new Date().getTime() / 1000);
    var timeStampYesterday = timeStamp - (24 * 3600);
    console.log('from readableDate', dateMilliseconds, timeStampYesterday)
    console.log(date, new Date().getTime())
    if (dateMilliseconds > timeStampYesterday) {
        dateString = 'at ' + new Date(parseInt(date, 10)).toString().slice(16, 21);
    } else {
        dateString = 'on ' + new Date(parseInt(date, 10)).toString().slice(3, 15);
    }
    return dateString;
}

export const readableTime = (date) => {
    let timeString = Date(date).toString();
    timeString = timeString.slice(16,21);
    return timeString
}


export const threadInfoRender = (thread, subforum) => {
    if (thread.Posts[0]) {
        return (
            <ThreadInfo
                id={thread.id}
                param={subforum.title}
                title={thread.title}
                threadUser={thread.user.userName}
                latestPostUser={thread.Posts[thread.Posts.length - 1].user.userName}
                latestPostTime={thread.Posts[thread.Posts.length - 1].createdAt}
                postCount={thread.Posts.length}
                key={thread.id}
            />
        )
        } else {
        return (
            <ThreadInfo
                id={thread.id}
                param={subforum.title}
                title={thread.title}
                threadUser={thread.user.userName}
                key={thread.id}
            />
        )
    }
}

export const mockAvatarAssignment = (userName) => {
    if (userName === 'SinbadGhost') {
        return (
            '/images/AdventureIsland.png'
        )
    } else if (userName === 'SuperUrph') {
        return (
            '/images/BattleZequeden.png'
        )
    } else if (userName === 'Bumb22') {
        return (
            '/images/DrFranken.png'
        )
    } else if (userName === 'UpperMagnolia') {
        return (
            '/images/Marle.png'
        )
    } else if (userName === 'BrokenSword') {
        return (
            '/images/Vandal02.png'
        )
    } else {
        return (
            '/images/bustamove.png'
        )
    }
}