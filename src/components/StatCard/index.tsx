import { Card, CardContent } from '@mui/material';
interface StatCardProps {
	icon: React.ElementType;
	count: number;
	label: string;
	bgColor: string;
	highlightColor: string;
}
export const StatCard: React.FC<StatCardProps> = ({
	icon: Icon,
	count,
	label,
	bgColor,
	highlightColor
}) => (
	<Card className={`${bgColor} rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1`}>
		<CardContent className="p-6 relative">
			<div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105">
				<Icon className="w-6 h-6 text-white" />
			</div>
			<div className="relative z-10">
				<h3 className="text-4xl font-bold text-white mb-2 tracking-tight">
					{count}
				</h3>
				<p className="text-white/90 font-medium">{label}</p>
			</div>
			<div className={`absolute right-0 bottom-0 w-32 h-32 ${highlightColor} rounded-tl-full transition-transform duration-500 hover:scale-110`} />
		</CardContent>
	</Card>
);