import { getProjectSummary } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';

const SUMMARY_ITEMS = [
  {
    label: 'Jumlah Proyek Salur',
    key: 'jumlahProject',
  },
  { label: 'Proyek Akan / Sudah Tergalang', key: 'activeClose' },
  { label: 'Proyek Sedang Tergalang', key: 'activeOpen' },
  { label: 'Proyek Selesai', key: 'done' },
  { label: 'Total Penerima Manfaat', key: 'pmTotal' },
];

export const ProjectsSummary = ({ programLink }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['projectsSummary', programLink],
    queryFn: () => getProjectSummary({ program_link: programLink }),
    enabled: !!programLink,
    staleTime: 300_000, // 5 menit dalam ms
    cacheTime: 600_000, // 10 menit dalam ms
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading) return null;
  if (error)
    return (
      <div className="error-message">An error occurred: {error.message}</div>
    );

  const summary = data?.data || {};
  // console.log(summary);

  return (
    <div className="donate-body-wrapper border-top">
      {SUMMARY_ITEMS.map(({ label, key }) => (
        <div key={key} className="table-salur-row">
          <div className="table-salur-column first">{label}</div>
          <div className={`table-salur-column text-end`}>
            {summary[key] || 0}
          </div>
        </div>
      ))}
    </div>
  );
};
