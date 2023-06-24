import {Resolutions} from '../routes/videos-router';

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

const titleCheck = (title: string) => {
  if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
    errorMessage.errorsMessages.push({
      message: "title is incorrect",
      field: "title"
    })
  }
}
const authorCheck = (author: string) => {
  if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
    errorMessage.errorsMessages.push({
      message: "author is incorrect",
      field: "author"
    })
  }
}
const availableResolutionsCheck = (availableResolutions: []) => {
  if (!Array.isArray(availableResolutions)) {
    errorMessage.errorsMessages.push({
      message: "availableResolutions is incorrect",
      field: "availableResolutions"
    })
  } else {
    const resolutions = Object.keys(Resolutions)

    availableResolutions.forEach((item: any) => {
      if(!resolutions.includes(item)){
       return errorMessage.errorsMessages.push({
          message: "availableResolutions is incorrect",
          field: "availableResolutions"
        })
      }
    })
  }
}
const canBeDownloadedCheck = (canBeDownloaded: boolean) => {
  if (!canBeDownloaded || typeof canBeDownloaded !== 'boolean') {
    errorMessage.errorsMessages.push({
      message: "canBeDownloaded is incorrect",
      field: "canBeDownloaded"
    })
  }
}
const minAgeRestrictionCheck = (minAgeRestriction: string) => {
  if (!minAgeRestriction || minAgeRestriction > 18 || minAgeRestriction < 1) {
    errorMessage.errorsMessages.push({
      message: "minAgeRestriction is incorrect",
      field: "minAgeRestriction"
    })
  }
}
const publicationDateCheck = (publicationDate: string) => {
  if (!publicationDate || typeof publicationDate !== 'string' || !publicationDate.trim()) {
    errorMessage.errorsMessages.push({
      message: "publicationDate is incorrect",
      field: "publicationDate"
    })
  }
}

export const handleVideoErrors = {
  postErrors(title: string, author: string, availableResolutions: []) {
    errorMessage.errorsMessages = []

    titleCheck(title)
    authorCheck(author)
    availableResolutionsCheck(availableResolutions)

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

    titleCheck(title)
    authorCheck(author)
    availableResolutionsCheck(availableResolutions)
    canBeDownloadedCheck(canBeDownloaded)
    minAgeRestrictionCheck(minAgeRestriction)
    publicationDateCheck(publicationDate)

    return errorMessage
  }
}
