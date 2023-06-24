interface Error {
  message: string,
  field: string
}

interface ErrorMessage {
  errorsMessages: Error[]
}


const errorMessage: ErrorMessage = {
  errorsMessages: []
}

export const handleVideoErrors = {
  postErrors(title: string, author: string, availableResolutions: []) {
    errorMessage.errorsMessages = []
    if (!title || typeof title !== 'string' || !title.trim()) {
      errorMessage.errorsMessages.push({
        message: "title is incorrect",
        field: "title"
      })
    }

    if (!author || typeof author !== 'string' || !author.trim()) {
      errorMessage.errorsMessages.push({
        message: "author is incorrect",
        field: "author"
      })
    }

    if (!Array.isArray(availableResolutions)) {
      errorMessage.errorsMessages.push({
        message: "availableResolutions is incorrect",
        field: "availableResolutions"
      })
    }
    return errorMessage
  },
  putErrors(
    title: string,
    author: string,
    availableResolutions: [],
    canBeDownloaded: boolean,
    minAgeRestriction: string,
    publicationDate: string
  ) {
    errorMessage.errorsMessages = []
    if (!title || !title.trim() || typeof title !== 'string') {
      errorMessage.errorsMessages.push({
        message: "title is incorrect",
        field: "title"
      })
    }

    if (!author || !author.trim() || typeof author !== 'string') {
      errorMessage.errorsMessages.push({
        message: "author is incorrect",
        field: "author"
      })
    }

    if (!Array.isArray(availableResolutions)) {
      errorMessage.errorsMessages.push({
        message: "availableResolutions is incorrect",
        field: "availableResolutions"
      })
    }

    if (!canBeDownloaded || typeof canBeDownloaded !== 'boolean') {
      errorMessage.errorsMessages.push({
        message: "canBeDownloaded is incorrect",
        field: "canBeDownloaded"
      })
    }

    if (!minAgeRestriction || !minAgeRestriction.trim() || typeof minAgeRestriction !== 'string') {
      errorMessage.errorsMessages.push({
        message: "minAgeRestriction is incorrect",
        field: "minAgeRestriction"
      })
    }

    if (!publicationDate || !publicationDate.trim() || typeof publicationDate !== 'string') {
      errorMessage.errorsMessages.push({
        message: "publicationDate is incorrect",
        field: "publicationDate"
      })
    }
    return errorMessage
  }
}
