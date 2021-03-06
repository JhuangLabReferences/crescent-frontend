import { connect } from 'react-redux'

import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

import Actions from '../actions'

export default connect(
  state => state,
  dispatch => ({
    actions: {
      setProject: project => dispatch(Actions.setProject({project})),
      setGuestUser: user => dispatch(Actions.setGuestUser({user})),
      setUser: user =>  dispatch(Actions.setUser({user})),
      setRun: run => dispatch(Actions.setRun({run})),
      toggleInfo: () => dispatch(Actions.toggleInfo()),
      toggleProjects: (kind) => dispatch(Actions.toggleProjects({kind})),
      toggleRuns: () => dispatch(Actions.toggleRuns()),
      toggleSidebar: sidebar => dispatch(Actions.toggleSidebar({sidebar})),
      setParameters: parameters => dispatch(Actions.setParameters({parameters})),
      setIsSubmitted: isSubmitted => dispatch(Actions.toggle.vis.pipeline.setIsSubmitted({isSubmitted})),

      toggle: {
        setActiveProjectKind: projectKind => dispatch(Actions.toggle.project.setActiveProjectKind({projectKind})),
        setActivePipelineStep: step => dispatch(Actions.toggle.vis.pipeline.setActivePipelineStep({step})),
        setActiveResult: result => dispatch(Actions.toggle.vis.results.setActiveResult({result})),
        setSelectedQC: value => dispatch(Actions.toggle.vis.results.setSelectedQC({value}))
      },

      thunks: {
        initializeResults: runID => dispatch(Actions.thunks.initializeResults(runID)),
        clearResults: () => dispatch(Actions.thunks.clearResults()),
        initializeScatter: runID => dispatch(Actions.thunks.initializeScatter(runID)),
        toggleLoadingResults: loading => dispatch(Actions.thunks.initializeResults(loading)),
        changeActiveGroup: newGroup => dispatch(Actions.thunks.changeActiveGroup(newGroup)),
        updateScatter: (runID, selectedGroup) => dispatch(Actions.thunks.updateScatter({runID, selectedGroup})),
        changeSelectedFeature: feature => dispatch(Actions.thunks.changeSelectedFeature(feature)),
        fetchScatter: () => dispatch(Actions.thunks.fetchScatter()),
        fetchOpacity: () => dispatch(Actions.thunks.fetchOpacity()),
        fetchViolin: () => dispatch(Actions.thunks.fetchViolin()),
        fetchHeatMap: () => dispatch(Actions.thunks.fetchHeatMap()),
        fetchTopExpressed: runID => dispatch(Actions.thunks.fetchTopExpressed(runID)),
        fetchQC: runID => dispatch(Actions.thunks.fetchQC(runID)),
        fetchAvailableQC: runID => dispatch(Actions.thunks.fetchAvailableQC(runID)),
        fetchMetrics: runID => dispatch(Actions.thunks.fetchMetrics(runID)),
        fetchGSVAMetrics: runID => dispatch(Actions.thunks.fetchGSVAMetrics(runID)),
        getCategoricalGroups: runID => dispatch(Actions.thunks.getCategoricalGroups(runID)),
        resetGroups: runID => dispatch(Actions.thunks.resetGroups(runID)),
      }
    }
  })
)