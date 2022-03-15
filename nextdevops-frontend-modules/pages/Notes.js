import React from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { getNotes, postNotes } from "../redux/actions/Notes";
import NotesComponent from "../components/Notes";

const Notes = (props) => {
  const {
    router: {
      query: { quoteId, role, uname },
    },
  } = props;
  return (
    <NotesComponent
      quoteId={quoteId}
      role={role}
      uname={uname}
      getNotes={getNotes}
      postNotes={postNotes}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotes: (quoteId, role) => getNotes(dispatch, quoteId, role),
    postNotes: (noteDetails) => postNotes(noteDetails),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Notes));
