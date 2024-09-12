$(document).ready(function () {
    // html elements
    var form = $('#form');
    var namePoll = $('#name-poll');
    // var answers = $('input[name="answer"]');

    var info = `
    <div class="inner-form">
                <div class="row mb-3">
                    <div class="col-2"></div>
                    <div class="col-10">
                        <div class="form-group">
                            <input
                                id="question"
                                type="text"
                                class="form-control input-question"
                                placeholder="Enter your question"
                            />
                            <div class="invalid-feedback">Question is not valid</div>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-2"></div>
                    <div id="form-status" class="col-10">
                        <div class="form-check mb-1">
                            <div class="d-flex align-items-center">
                                <input
                                    name="type-option"
                                    type="checkbox"
                                    class="form-check-input"
                                    value="mandatory"
                                />
                                <label for="" class="form-check-label">Mandatory</label>
                            </div>
                        </div>
                        <div class="form-check mb-1">
                            <div class="d-flex align-items-center">
                                <input
                                    name="type-option"
                                    type="checkbox"
                                    class="form-check-input"
                                    value="select-multiple"
                                />
                                <label for="" class="form-check-label">You can select multiple options</label>
                            </div>
                        </div>
                        <div class="invalid-feedback">You must choose at least 1 item</div>
                    </div>
                </div>

                <div class="row mb-3 align-items-center">
                    <div class="col-2">
                        <p class="text-right">Possible answers</p>
                    </div>
                    <div class="col-10">
                        <div class="form-group form-answer p-1 d-flex flex-column">
                            <div class="d-flex align-items-center">
                                <input
                                    type="text"
                                    class="form-control d-inline-block p-1"
                                    style="width: 90%"
                                    placeholder="Type your answers"
                                    id="answer-1"
                                    name="answer"
                                />
                                <a
                                    class="btn btn-info btn-add-answer text-light d-inline-block"
                                    style="height: 100%"
                                    ><i class="fas fa-plus"></i
                                ></a>
                            </div>
                        </div>
                        <div class="invalid-feedback">Answer is not valid</div>
                    </div>
                </div>
                </div>`;

    var btnAddAnswer = $('.btn-add-answer');
    var btnAddQuestion = $('.btn-add-question');

    var interviews = [];

    // validate
    function validateLength(str, minLength, maxLength) {
        return str.length >= minLength && str.length <= maxLength;
    }

    form.on('submit', function (e) {
        e.preventDefault();

        // reset invalid messages before submit
        $('input.input-name-poll').next().hide();

        $('input.input-question').each(function () {
            $(this).next().hide();
        });

        $('input[name="answer"]').each(function () {
            $(this).closest('.form-answer').next().hide();
        });

        var invalid = false;

        if (!validateLength(namePoll.val(), 3, 255)) {
            namePoll.next().show();
            invalid = true;
        }

        $('input.input-question').each(function () {
            if (!validateLength($(this).val(), 3, 255)) {
                $(this).next().show();
                invalid = true;
            }
        });

        $('input[name="answer"]').each(function () {
            if (!validateLength($(this).val(), 3, 200)) {
                $(this).closest('.form-answer').next().show();
                invalid = true;
            }
        });

        console.log(invalid);

        if (!invalid) {
            // loop form-child
            $('.inner-form').each(function () {
                // answers
                var answers = [];
                $(this)
                    .find('input[name="answer"]')
                    .each(function () {
                        answers.push($(this).val());
                    });

                var question = $(this).find('input#question');

                var types = [];
                $(this)
                    .find('input[name="type-option"]:checked')
                    .each(function () {
                        types.push($(this).val());
                    });

                var interview = {
                    id: Date.now(),
                    namePoll: namePoll.val(),
                    question: question.val(),
                    answers,
                    types,
                    isClose: false,
                };

                // console.log(interview);

                interviews.push(interview);
                localStorage.setItem('interviews', JSON.stringify(interviews));
                window.location.href = 'list.html';
            });
        }
    });

    // handle add answer
    $(document).on('click', '.btn-add-answer', function () {
        $(this).closest('.form-answer').prepend(`<input
                                                type="text"
                                                class="form-control d-inline-block p-1"
                                                style="width: 90%"
                                                placeholder="Type your answers"
                                                id="answer-${Date.now().toString()}" 
                                                name="answer"/>
                                            `);
    });

    // btnAddAnswer.on('click', function () {
    //     $('.form-answer').prepend(` <input
    //                             type="text"
    //                             class="form-control d-inline-block p-1"
    //                             style="width: 90%"
    //                             placeholder="Type your answers"
    //                             id="answer-${Date.now().toString()}"
    //                             name="answer"/>
    //                         `);
    // });

    // handle add question
    btnAddQuestion.on('click', function (e) {
        e.preventDefault();

        namePoll.closest('.row').after(info);
    });
});
