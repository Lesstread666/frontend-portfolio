$(document).on('latestProjectReady', () => {
    const projectCards = $('.project-card')

    projectCards.each((index, card) => {
        setTimeout(() => { $(card).addClass('fade-in') }, 1500 + index * 1500)
    })
})