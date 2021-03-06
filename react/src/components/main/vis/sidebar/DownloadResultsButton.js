import React, { useState } from 'react'
import {Button} from 'semantic-ui-react'

import * as R from 'ramda'
import * as RA from 'ramda-adjunct'

import withRedux from '../../../../redux/hoc'

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import {queryIsNotNil} from '../../../../utils'

const DownloadResultsButton = withRedux(
  ({
    app: {
      run: {
        runID,
        status: runStatus
      }
    }
  }) => {
    const {data, loading, error, refetch} = useQuery(gql`
      query Run($runID: ID) {
        run(runID: $runID) {
          downloadable
        }
      }
    `, {
      fetchPolicy: 'cache-and-network',
      variables: {runID},
    })

    const {downloadable} = R.ifElse(
      queryIsNotNil('run'),
      R.prop('run'),
      R.always({downloadable: false})
    )(data)

    const [clicked, setClicked] = useState(false)
        
    return (
      <Button fluid color='violet'
        content={R.prop(runStatus, {
          pending: 'RESULTS UNAVAILABLE',
          // missing 'submitted' because RefreshRunButton rendered if run status is so
          completed: 'DOWNLOAD RESULTS',
          failed: 'DOWNLOAD RUN LOGS'
        })}
        disabled={
          R.any(RA.isTrue, [
            R.either(R.equals('pending'), R.equals('submitted'))(runStatus),
            clicked,
            R.not(downloadable)
          ])}
        download
        target='_blank'
        // Should only work with nginx reverse proxy
        // see: https://github.com/suluxan/crescent-frontend/commit/8300e985804518ce31e1de9c3d3b340ee94de3f6
        href={`/express/download/${runID}`}
        onClick={() => {
          setClicked(true)
        }}
      />
    )
  }
)

export default DownloadResultsButton