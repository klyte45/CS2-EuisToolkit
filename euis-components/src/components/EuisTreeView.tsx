import { ReactNode, useState } from 'react';
import '../styles/treeview.scss'

type Props = {
  defaultCollapsed?: boolean,
  children?: React.ReactNode,
  className?: string,
  itemClassName?: string,
  nodeLabel: React.ReactNode,
  allowClickAnywhere?: boolean
}

const EuisTreeView = ({
  defaultCollapsed = true,
  nodeLabel,
  children,
  className,
  itemClassName,
  allowClickAnywhere = true
}: Props): JSX.Element => {

  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const handleClick = () => {
    setCollapsed(!collapsed);
  }

  let arrowClassName = 'tree-view_arrow';
  let containerClassName = 'tree-view_children';
  if (collapsed) {
    arrowClassName += ' tree-view_arrow-collapsed';
    containerClassName += ' tree-view_children-collapsed';
  }

  const arrow = <div
    className={className + ' ' + arrowClassName}
    onClick={handleClick} />;

  return (
    <div className="tree-view">
      <div className={'tree-view_item ' + itemClassName} onClick={allowClickAnywhere ? handleClick : undefined}>
        {arrow}
        {nodeLabel}
      </div>
      <div className={containerClassName ?? ""}>
        {!collapsed && children}
      </div>
    </div>
  );
};

export default EuisTreeView;