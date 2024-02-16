import { Modal, Spin, message } from "antd";
import { Property, Query } from "@prisma/client";
import { useEffect, useState } from "react";
import { getQueryByPropertyId } from "@/actions/queries";

interface Props {
  shoQueries: boolean;
  selectedProperty: Property | null;
  setShowQuery: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowQueryModal = ({
  selectedProperty,
  setShowQuery,
  shoQueries,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true);
        const res: any = await getQueryByPropertyId(
          selectedProperty?.id as string
        );
        if (res.error) throw new Error(res.error);
        setQueries(res.data);
      } catch (error: any) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedProperty) fetchQuery();
  }, [selectedProperty]);

  return (
    <Modal
      title="Queries"
      open={shoQueries}
      onCancel={() => setShowQuery(false)}
      footer={null}
    >
      <Spin spinning={loading}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">
            Property: {selectedProperty?.name}
          </h2>
          {queries.length > 0 ? (
            queries.map((query) => (
              <div
                key={query.id}
                className="border border-gray-300 p-2 mb-4 border-solid rounded"
              >
                <p className="text-sm font-semibold">Name: {query.name}</p>
                <p className="text-sm font-semibold">Email: {query.email}</p>
                <p className="text-sm">Message: {query.message}</p>
              </div>
            ))
          ) : (
            <p className="text-sm">No queries found for this property.</p>
          )}
        </div>
      </Spin>
    </Modal>
  );
};

export default ShowQueryModal;
