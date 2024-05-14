import React, { useState } from "react";
import TargetEntry from "../../components/TargetEntry/TargetEntry";
import LinkForm from "../../components/LinkForm/LinkForm";
import "./CreateLinkPage.css";

type DivContent = {
  url: string;
  startDate: string | null;
  expireDate: string | null;
};

export default function CreateLinkPage() {
  const [visibleForm, setVisibleForm] = useState(false);
  const [divList, setDivList] = useState<DivContent[]>([]);
  return (
    <div className="createLinkPage">
      <h4 className="small-title">Create new Link</h4>
      <div className="marginWrapper">
        <LinkForm visibleForm={visibleForm} setVisibleForm={setVisibleForm} divList={divList} setDivList={ setDivList} />
        <TargetEntry
          visibleForm={visibleForm}
          setVisibleForm={setVisibleForm}
          divList={divList} setDivList={ setDivList} 
        />
      </div>
    </div>
  );
}
