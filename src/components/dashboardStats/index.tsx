import React from 'react';
import { Calendar } from 'lucide-react';

interface NotificationCardProps {
  icon: 'calendar' | 'circle';
  title: string;
  subtitle: string;
  color: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ icon, title, subtitle, color }) => (
  <div className="flex items-center space-x-3">
    {icon === 'calendar' ? (
      <Calendar className={`text-${color}-500`} size={24} />
    ) : (
      <div className={`w-6 h-6 bg-${color}-200 rounded-full`} />
    )}
    <div>
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  </div>
);

interface MetricCardProps {
  value: string;
  label: string;
  change?: string;
  changeColor: 'green' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label, change, changeColor }) => (
  <div className="bg-green-800 text-white p-4 rounded-lg row">
    <Calendar size={40} className="mb-2" />
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm">{label}</div>
    {/* {change && (
      <div className={`text-xs mt-1 text-${changeColor}-300`}>
        {change}
      </div>
    )} */}
  </div>
);

const DashboardStats: React.FC = () => (
  <div className="space-y-4">
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">Notifications</h2>
      <div className="grid grid-cols-3 gap-4">
        <NotificationCard
          icon="calendar"
          color="blue"
          title="Quarter ends in 117 days"
          subtitle="Programme alerts"
        />
        <NotificationCard
          icon="calendar"
          color="cyan"
          title="SAPR starts in 30 days"
          subtitle="Programme alerts"
        />
        <NotificationCard
          icon="circle"
          color="red"
          title="384 Reporting Facilities (100%)"
          subtitle="Total facilites = 384"
        />
      </div>
    </div>
    <div className="bg-yellow-50 p-4 rounded-lg">
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          value="58206"
          label="TX_CURR"
          change="+43.33% from Last Quarter"
          changeColor="green"
        />
        <MetricCard
          value="0"
          label="TX_NEW"
          change="+922337203685477760% as at 2024-10-16"
          changeColor="green"
        />
        <MetricCard
          value="841"
          label="PVLS"
          change="+922337203685477760% 91.0% Suppressed"
          changeColor="green"
        />
        <MetricCard
          value="25858"
          label="IIT"
          change="-85.65% as at 2024-10-16"
          changeColor="red"
        />
      </div>
    </div>
  </div>
);

export default DashboardStats;