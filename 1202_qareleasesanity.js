const Alexa = require('ask-sdk');
let skill;

exports.handler = async function (event, context) {
    debugger;
    //console.log('REQUEST ' + JSON.stringify(event));
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addErrorHandlers(ErrorHandler)
            .addRequestHandlers(
                // delete undefined built-in intent handlers
                //CancelIntentHandler,
                //HelpIntentHandler,
                //StopIntentHandler,
                //NavigateHomeIntentHandler,
                //FallbackIntentHandler,
                LaunchRequestHandler,
                //SessionEndedRequestHandler
                // add custom Intent handlers
                GetTheDayMoodHandler
            ).create();
    }

    const response = await skill.invoke(event, context);
    //console.log('RESPONSE :' + JSON.stringify(response));
    return response;
};

const ErrorHandler = {
    canHandle(handlerInput) {
        return true;
    },
    handle(handlerInput, error) {
        console.log('Error handled: ' + JSON.stringify(error.message));
        // console.log('Original Request was:', JSON.stringify(handlerInput.requestEnvelope.request, null, 2));

        const speechText = 'Sorry, your skill encountered an error';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
};


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to my Alexa app';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
};

const GetTheDayMoodHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetTheDayMood';
    },
    handle(handlerInput) {
        // invoke custom logic of the handler
        //const slotValue = Alexa.getSlotValue(handlerInput.requestEnvelope, 'slotName');
        const speechText = 'This is my custom intent handler';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
};


