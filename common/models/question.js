'use strict';

module.exports = function(Question) {
    Question.validatesInclusionOf('questionType', {in: ['write', 'choose']});
};
