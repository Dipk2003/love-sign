'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface PrivacySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
}

interface PrivacyControlsProps {
  settings: PrivacySetting[];
  onSettingChange: (settingId: string, enabled: boolean) => void;
}

const PrivacyControls = ({ settings, onSettingChange }: PrivacyControlsProps) => {
  return (
    <div className="space-y-4">
      {settings.map((setting) => (
        <div
          key={setting.id}
          className="bg-card border border-border rounded-xl p-4 hover:shadow-subtle transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={setting.icon as any} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-headline font-semibold text-foreground mb-1">
                  {setting.name}
                </h4>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              </div>
            </div>
            <button
              onClick={() => onSettingChange(setting.id, !setting.enabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 flex-shrink-0 ${
                setting.enabled ? 'bg-primary' : 'bg-muted'
              }`}
              role="switch"
              aria-checked={setting.enabled}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  setting.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      ))}

      <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Icon name="ShieldCheckIcon" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-headline font-semibold text-foreground mb-1">
              Your Privacy Matters
            </h4>
            <p className="text-xs text-muted-foreground">
              All your data is encrypted and secure. You have full control over who sees your profile and personal information. We never share your data with third parties without your explicit consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;