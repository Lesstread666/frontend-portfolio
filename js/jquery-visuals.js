$(() => {

    const projectCards = $('.project-card')

    projectCards.each((index, card) => {
        $(card)
            .delay(index * 150)
            .fadeTo(0, 1)
            .addClass('fade-in')
    })

})