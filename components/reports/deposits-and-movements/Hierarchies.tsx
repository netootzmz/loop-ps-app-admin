/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { getHierarchy } from "api/configuration/UserInformationController";
import Select from "components/forms/Select";

import { useFilters } from "./DepositsAndMovementsFiltersContext";

interface Props {
  groupId: string;
}

const defaultState = {
  show: false,
  items: [],
  selected: "",
};

const Hierarchies = (props: Props) => {
  const { filters, updateFilters } = useFilters();
  const [group, setGroup] = useState({
    ...defaultState,
    selected: filters.groupId,
  });
  const [grouper, setGrouper] = useState({
    ...defaultState,
    selected: filters.grouperId,
  });
  const [reasonSocial, setReasonSocial] = useState({
    ...defaultState,
    selected: filters.reasonSocialId,
  });
  const [branch, setBranch] = useState({
    ...defaultState,
    selected: filters.branchId,
  });
  const showHierarchies =
    group.show || grouper.show || reasonSocial.show || branch.show;

  useEffect(() => {
    setGroup({ ...group, selected: filters.groupId });
    setGrouper({
      ...grouper,
      selected: filters.grouperId,
      show: Boolean(filters.grouperId) || Boolean(grouper.items.length > 0),
    });
    setReasonSocial({
      ...reasonSocial,
      selected: filters.reasonSocialId,
      show:
        Boolean(filters.reasonSocialId) ||
        Boolean(reasonSocial.items.length > 0),
    });
    setBranch({
      ...branch,
      selected: filters.branchId,
      show: Boolean(filters.branchId) || Boolean(branch.items.length > 0),
    });
  }, [filters]);

  useEffect(() => {
    updateHierarchy(props.groupId);
    // updateHierarchy("ResTC1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.groupId]);

  const formatItems = (hierarchies: any) => {
    return hierarchies.map((item: { groupId: string; groupName: string }) => {
      return {
        value: item.groupId,
        text: item.groupName,
      };
    });
  };

  const updateHierarchy = async (groupId: string) => {
    let res;
    if (groupId !== "") {
      res = await getHierarchy(groupId);
    }
    if (res?.next_hierarchy) {
      if (res.next_hierarchy[0].groupLevelId === 2) {
        const itemsFormated = formatItems(res.next_hierarchy);
        setGroup({ ...group, show: true, items: itemsFormated });
      }
      if (res.next_hierarchy[0].groupLevelId === 3) {
        const itemsFormated = formatItems(res.next_hierarchy);
        setGrouper({ ...group, show: true, items: itemsFormated });
      }
      if (res.next_hierarchy[0].groupLevelId === 4) {
        const itemsFormated = formatItems(res.next_hierarchy);
        setReasonSocial({ ...reasonSocial, show: true, items: itemsFormated });
      }
      if (res.next_hierarchy[0].groupLevelId === 5) {
        const itemsFormated = formatItems(res.next_hierarchy);
        setBranch({ ...branch, show: true, items: itemsFormated });
      }
    }
  };

  const onChangeSelected = (event: React.FormEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { currentTarget } = event;

    if (currentTarget.name === "group") {
      setGroup({ ...group, selected: currentTarget.value });
      setGrouper(defaultState);
      setReasonSocial(defaultState);
      setBranch(defaultState);
      updateHierarchy(currentTarget.value);
      updateFilters({
        groupId: currentTarget.value,
        grouperId: "",
        reasonSocialId: "",
        branchId: "",
      });
    }
    if (currentTarget.name === "grouper") {
      setGrouper({ ...grouper, selected: currentTarget.value });
      setReasonSocial(defaultState);
      setBranch(defaultState);
      updateHierarchy(currentTarget.value);
      updateFilters({
        grouperId: currentTarget.value,
        reasonSocialId: "",
        branchId: "",
      });
    }
    if (currentTarget.name === "reasonSocial") {
      setReasonSocial({ ...reasonSocial, selected: currentTarget.value });
      setBranch(defaultState);
      updateHierarchy(currentTarget.value);
      updateFilters({
        reasonSocialId: currentTarget.value,
        branchId: "",
      });
    }
    if (currentTarget.name === "branch") {
      setBranch({ ...branch, selected: currentTarget.value });
      updateHierarchy(currentTarget.value);
      updateFilters({
        branchId: currentTarget.value,
      });
    }
  };

  return (
    <>
      {showHierarchies ? (
        <section className="side">
          <h4 className="h4" style={{ marginBottom: "1.5rem" }}>
            <b>Jerarquía de comercio</b>
          </h4>
          <div className="side--container">
            {group.show && (
              <article>
                <Select
                  label="Grupo"
                  options={group.items}
                  placeholder="Grupo"
                  onChange={onChangeSelected}
                  value={group.selected}
                  name="group"
                />
              </article>
            )}
            {grouper.show && (
              <article>
                <Select
                  label="Agrupador"
                  options={grouper.items}
                  placeholder="Grupo"
                  onChange={onChangeSelected}
                  value={grouper.selected}
                  name="grouper"
                />
              </article>
            )}
            {reasonSocial.show && (
              <article>
                <Select
                  label="Razón social"
                  options={reasonSocial.items}
                  placeholder="Grupo"
                  onChange={onChangeSelected}
                  value={reasonSocial.selected}
                  name="reasonSocial"
                />
              </article>
            )}
            {branch.show && (
              <article>
                <Select
                  label="Sucursal"
                  options={branch.items}
                  placeholder="Grupo"
                  onChange={onChangeSelected}
                  value={branch.selected}
                  name="branch"
                />
              </article>
            )}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Hierarchies;
