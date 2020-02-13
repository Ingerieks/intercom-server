export const schema = {
  title: {
    type: String,
    required: true,
    errors: {
      type: 'Title must be a string.',
      required: 'Title is required.'
    }
  },
  completed: {
    type: Boolean,
    required: false,
    default: false
  },
  order: {
    type: Number,
    required: false
  }
};

function cleanUpIntercomObject(intercom, baseUrl) {
  if (intercom.hasOwnProperty('position')) {
    intercom.order = intercom.position;
    delete intercom.position;
  }

  for (var [key, value] of Object.entries(intercom)) {
    if (value === null || value === undefined) delete intercom[key];
  }

  intercom.url = `${baseUrl}/intercom/${intercom.id}`;

  return intercom;
}

export default function transformResponse(result) {
  if (result.intercom) {
    result = result.intercom.map((obj) => cleanUpIntercomObject(obj, result.baseUrl));
  }

  if (result.intercom) {
    result = cleanUpIntercomObject(result.intercom, result.baseUrl);
  }

  return result;
}
