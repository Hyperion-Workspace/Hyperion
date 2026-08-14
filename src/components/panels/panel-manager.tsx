"use client";

import { Panel } from "@/components/panel/panel";
import { AccountPanel } from "@/components/panels/account-panel";
import { BillingPanel } from "@/components/panels/billing-panel";
import { UpgradePanel } from "@/components/panels/upgrade-panel";
import { usePanelStore } from "@/stores/panel-store";

export function PanelManager() {
  const { activePanel, closePanel } = usePanelStore();

  const getPanelContent = () => {
    switch (activePanel) {
      case "upgrade":
        return {
          title: "Upgrade to Hyperion Pro",
          content: <UpgradePanel />,
        };
      case "account":
        return {
          title: "Account Settings",
          content: <AccountPanel />,
        };
      case "billing":
        return {
          title: "Billing Dashboard",
          content: <BillingPanel />,
        };
      default:
        return {
          title: "",
          content: null,
        };
    }
  };

  const { title, content } = getPanelContent();

  return (
    <Panel isOpen={activePanel !== null} onClose={closePanel} title={title}>
      {content}
    </Panel>
  );
}
