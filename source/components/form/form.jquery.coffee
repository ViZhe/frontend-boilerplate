
mhForm = do ->
    # private API
    version = '0.0.1'

    init = ->
        $('input').each ->
            it = $(@)
            inputType = checkType(it)
            if inputType == false then return
            parent = it.parent()
            if it.prop('checked')
                parent.addClass 'b-form__' + inputType + '_checked'
                return
            else
                parent.removeClass 'b-form__' + inputType + '_checked'
                return

        $('body').on 'click', '.b-form__radio input', toggleChecked
        $('body').on 'click', '.b-form__checkbox input', toggleChecked
        return

    checkType = (it) ->
        parent = it.parent()
        if parent.hasClass('b-form__radio')
            type = 'radio'
        else if parent.hasClass('b-form__checkbox')
            type = 'checkbox'
        else
            type = false

        return type

    toggleChecked = ->
        it = $(@)
        inputType = checkType(it)
        if it.prop('checked')
            addChecked(it, inputType)
        else
            unChecked(it, inputType)

    addChecked = (it, inputType) ->
        it = $(it) if typeof it == 'string'
        inputType = checkType(it) unless inputType?
        propName = it.attr('name')
        if inputType == 'radio'
            $('[name="' + propName + '"]').parent()
                .removeClass 'b-form__radio_checked'

        it.parent().addClass 'b-form__' + inputType + '_checked'

    unChecked = (it, inputType) ->
        it = $(it) if typeof it == 'string'
        inputType = checkType(it) unless inputType?
        if inputType == 'radio' then return
        it.parent().removeClass 'b-form__' + inputType + '_checked'

    #  public API
    {
        init: init # Start initialize module
        addChecked: addChecked  # for checkbox and radio
        unChecked: unChecked # only for checkbox
    }

mhForm.init()

# mhForm.addChecked 'input#checkboxOn'
# mhForm.addChecked 'input#radioOn'
# mhForm.inChecked 'input#checkboxOff'
