// Method for running toil-cwl-runner
'use strict'

const R = require('ramda')

const { spawn } = require( 'child_process' )

// Make object to write as CWL job JSON file
const makeCWLJobJSON = ({
  singleCell,
  resolution,
  genes, // [String]
  opacity,
  principalDimensions,
  returnThreshold
}) => ({
  R_script: {
    class: 'File',
    path: '/Users/smohanra/Documents/crescent/docker-crescent/Runs_Seurat_Clustering.R'
  },
  sc_input: {
    class: 'Directory',
    // path: '/Users/smohanra/Documents/crescent/docker-crescent/filtered_gene_bc_matrices'
    path: '/Users/smohanra/Desktop/crescentMockup/express/tmp/minio'
  },
  sc_input_type: singleCell,
  resolution,
  outsdir: 'frontend_seurat_output',
  project_id: 'frontend_example_mac_10x_cwl',
  summary_plots: 'n',
  list_genes: R.join(',',genes),
  opacity,
  pca_dimensions: principalDimensions,
  percent_mito: 'Inf,0.05',
  number_genes: '200,8000',
  return_threshold: returnThreshold,
})

const submitCWL = (
  kwargs,
  session,
) => {
  const jobJSON = makeCWLJobJSON(kwargs)
  const cwl = spawn(
    `cd /Users/smohanra/Documents/crescent/docker-crescent && \
      source /Users/smohanra/Documents/crescent/docker-crescent/crescent/bin/activate && \
      export TMPDIR=/Users/smohanra/Documents/crescent/docker-crescent/tmp && \
      rm /Users/smohanra/Documents/crescent/docker-crescent/frontend_seurat_inputs.json && \
      echo '${JSON.stringify(jobJSON)}' >> /Users/smohanra/Documents/crescent/docker-crescent/frontend_seurat_inputs.json && \
      /Users/smohanra/Library/Python/2.7/bin/toil-cwl-runner \
        /Users/smohanra/Documents/crescent/docker-crescent/seurat.cwl \
        /Users/smohanra/Documents/crescent/docker-crescent/frontend_seurat_inputs.json \
    `,
      { 
        shell: true
      }
  )
  cwl.stdout.on( 'data', data => {
      console.log( `stdout` )
      console.log(data)
  })
  cwl.stderr.on( 'data', data => {
      console.log( `stderr: ${data}` )
  })
  cwl.on( 'close', code => {
      console.log( `child process exited with code ${code}` )
      session.publish('crescent.result', [], {})
  })
}

module.exports = submitCWL
