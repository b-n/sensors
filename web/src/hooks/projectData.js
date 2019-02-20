import { useState, useEffect } from 'react';
import { format, parse } from 'date-fns'
import { projectDataEndpoint } from '../config'

const useProjectData = (thing) => {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    fetch(
      projectDataEndpoint + thing,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        mode: 'cors'
      }
    )
      .then(res => res.json())
      .then(res => {
        const { projectItems, allProjects } = res;

        const data = projectItems.reduce((accumulator, project) => {
          const fromDate = parse(format(new Date(project.from), 'YYYY-MM-DD') + 'T00:00:00');

          if (accumulator[fromDate] === undefined) accumulator[fromDate] = [];
          accumulator[fromDate].push(project);
          return accumulator;
        }, {});

        const projectData = Object.keys(data).map(key => ({ date: key, data: data[key] }));
        projectData.sort((a,b) => a.date <= b.date ? a.date < b.date ? -1 : 0 : -1);

        setProjectData({
          thing,
          projectData,
          allProjects
        });
      });
  }, []);

  return projectData
}

export default useProjectData;
