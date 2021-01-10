import path from 'path';
import { getProjects } from '../plugins/source-project/index'

export default async (req, res) => {
  let error;
  let projects;

  try {
    projects = await getProjects();
    projects = projects.filter(p => p.name !== '.DS_Store');
    projects = projects.map(project => {
      return {
        ...project,
        api: `/api/preview?name=${project.name}&language=en`,
      }
    })
  } catch (e) {
    error = e.message;
  }
  //let source = await sourceNodes(input);
  // console.log(source);
  if (error) {
    res.status(404);
    res.json({ status: 'error', error });
  }

  res.status(202);
  res.json(projects)
}