

function Validation(validationRules) {
  this.errorMessages = [];
  for (var validationId in validationRules) {
    var inputValue = this.valueFromSelector(validationId);
    if (this.validateEmpty(validationRules[validationId], inputValue, validationId)) {
      this.validateMinMax(validationRules[validationId], inputValue, validationId);
      this.validateRegExp(validationRules[validationId], inputValue, validationId);
      if (typeof validationRules[validationId].match === 'string') {
        this.validateMatch(validationRules[validationId], inputValue, validationId);
      }

    }
  }
}

Validation.prototype.validateEmpty = function(validationObject, inputValue, context) {
  if (validationObject.empty === false) {
    if (inputValue === "") {
      this.errorMessages[context] = validationObject.errorMessageOn.empty;
      return false;
    }
  }

  return true;
};
Validation.prototype.valueFromSelector = function(id) {
  return document.querySelector('#' + id).value;
};
Validation.prototype.getErrorMessages = function() {
  return this.errorMessages;
};
Validation.prototype.getErrorMessageCount = function() {
return Object.keys(this.errorMessages).length;
};
Validation.prototype.validateMinMax = function(validationObject, inputValue, context) {
  if (inputValue.length < validationObject.min) {
    this.errors[context] = validationObject.errorMessageOn.min;
  }

  if (inputValue.length > validationObject.max) {
    this.errorMessages[context] = validationObject.errorMessageOn.max;
  }
};
Validation.prototype.validateRegExp = function(validationObject, inputValue, context) {
  if (validationObject.regexp) {
    var pattern = new RegExp(validationObject.regexp);
    if (!pattern.test(inputValue)) {
      this.errorMessages[context] = validationObject.errorMessageOn.regexp;
    }
  }
};

Validation.prototype.validateMatch = function(selectorObject, inputValue, selectorName) {
  var mustMatchValue = this.valueFromSelector(selectorObject.match);
  if (inputValue !== mustMatchValue) {
    this.errorMessages[selectorName] = selectorObject.errorMessageOn.match;
  }
};
