exports.createProjectURL = ({
  language,
  project,
}) => {
  
  return (language === 'en' ) ? `/${project}` : `/${language}/${project}`;
}

exports.prepareProjectNode = ({
  data,
  createNodeId,
  createContentDigest,
}) => {
  let dataWithId = {
    ...data,
    id: createNodeId(`project-${data.project}-${data.language}`),
  }
  return {
    ...dataWithId,
    internal: {
      type: 'Project',
      contentDigest: createContentDigest(dataWithId),
    }
  }
}

exports.prepareProjectImageNode = ({
  data,
  createNodeId,
  createContentDigest,
}) => {
  let dataWithId = {
    ...data,
    id: createNodeId(`project-image-${data.project}-${data.name}`),
  }
  return {
    ...dataWithId,
    internal: {
      type: 'ProjectImage',
      contentDigest: createContentDigest(dataWithId),
    }
  }
}