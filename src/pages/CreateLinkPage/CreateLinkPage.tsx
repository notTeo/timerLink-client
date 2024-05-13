import React, { useState } from "react";
import TargetEntry from "../../components/TargetEntry/TargetEntry";
import LinkForm from "../../components/LinkForm/LinkForm";
import "./CreateLinkPage.css";

export default function CreateLinkPage() {
  const [visibleForm, setVisibleForm] = useState(false);
  return (
    <div className="createLinkPage">
      <h4 className="small-title">Create new Link</h4>
      <div className="marginWrapper">
        <LinkForm visibleForm={visibleForm} setVisibleForm={setVisibleForm} />
        <TargetEntry
          visibleForm={visibleForm}
          setVisibleForm={setVisibleForm}
        />
      </div>
    </div>
  );
}
